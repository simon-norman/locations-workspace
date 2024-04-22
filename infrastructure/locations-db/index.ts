import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");
const availabilityZone = config.require("availability_zone");

const vpcStackRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-vpc/${environment}`,
);
const vpcId = vpcStackRef.getOutput("vpcId");

const vpnSecurityGroupId = vpcStackRef.getOutput("vpnSecurityGroupId");
const isolatedSubnetIds = vpcStackRef.getOutput("isolatedSubnetIds");

const postgresDb = new aws.RdsPrismaPostgresDb({
	region: awsRegion,
	name: "locations-db-instance",
	environment,
	vpcId,
	databaseName: "locations-db",
	availabilityZone,
	securityGroupIds: [vpnSecurityGroupId],
	subnetIds: isolatedSubnetIds,
	roles: [
		{
			name: "locations-api",
			grants: [
				{
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
export const dbRoleNames = postgresDb.roles.map((role) => role.role.name);
export const arn = postgresDb.db.arn;
