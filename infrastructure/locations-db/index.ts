import { aws, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");
const availabilityZone = config.require("availability_zone");

const productName = "main-app";

const vpcStackRef = helpers.getStackRef({
	environment,
	name: "vpc",
	region: awsRegion,
	productName,
});
const vpcId = vpcStackRef.getOutput("vpcId");

// const vpnSecurityGroupId = vpcStackRef.getOutput("vpnSecurityGroupId");
// const isolatedSubnetIds = vpcStackRef.getOutput("isolatedSubnetIds");
const publicSubnetIds = vpcStackRef.getOutput("publicSubnetIds");

const locationsApiDbPassword = config.requireSecret(
	"locations_api_db_password",
);

const locationsIngestDbPassword = config.requireSecret(
	"locations_ingest_db_password",
);

const testEnvironmentSetupDbPassword = pulumi.output(
	process.env.TEST_ENVRIONMENT_SETUP_DB_PASSWORD as string,
);

const postgresDb = new aws.RdsPrismaPostgresDb({
	region: awsRegion,
	name: "locations-db-instance",
	environment,
	vpcId,
	databaseName: "locations",
	availabilityZone,
	publiclyAccessible: true,
	securityGroupIds: [],
	subnetIds: publicSubnetIds,
	migrationScriptPath: "./migration-script.sh",
	datadog: true,
	roles: [
		{
			password: locationsApiDbPassword,
			name: "locations_api",
			grants: [
				{
					grantName: "alltables",
					database: "locations",
					objectType: "table",
					objects: [],
					privileges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
					schema: "public",
				},
			],
		},
		{
			password: locationsIngestDbPassword,
			name: "locations_ingest",
			grants: [
				{
					grantName: "alltables",
					database: "locations",
					objectType: "table",
					objects: [],
					privileges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
					schema: "public",
				},
			],
		},
		{
			password: testEnvironmentSetupDbPassword,
			name: "test_environment_setup",
			grants: [
				{
					grantName: "alltables",
					database: "locations",
					objectType: "table",
					objects: [],
					privileges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
					schema: "public",
				},
			],
		},
	],
});

export const dbAddress = postgresDb.db.address;
export const dbEndpoint = postgresDb.db.endpoint;
export const dbInstanceId = postgresDb.db.identifier;
export const dbRoleNames = postgresDb.roles.map((role) => role.role.name);
export const arn = postgresDb.db.arn;
