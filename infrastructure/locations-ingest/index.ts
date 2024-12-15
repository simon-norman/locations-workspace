import { aws, helpers } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");
const version = config.require("version");

const productName = "main-app";

const vpcStackRef = helpers.getStackRef({
	environment,
	name: "vpc",
	region: awsRegion,
	productName: "main-app",
});

const privateSubnetIds = vpcStackRef.getOutput("privateSubnetIds");

const securityGroupsRef = helpers.getStackRef({
	environment,
	name: "security-groups",
	region: awsRegion,
	productName,
});
const securityGroup = securityGroupsRef.getOutput(
	"inboundNoneSecurityGroupOutboundAll",
);

const dbStackRef = helpers.getStackRef({
	environment,
	name: "locations-db",
	region: awsRegion,
	productName,
});

const dbEndpoint = dbStackRef.getOutput("dbEndpoint");

new aws.QueuedLambdaFunction({
	region: awsRegion,
	name: "locations-ingest",
	environment,
	serviceDockerfileTarget: "release_locations_ingest",
	serviceDockerfilePath: "../../monorepo/Dockerfile",
	serviceDockerContext: "../../monorepo",
	serviceEnvironmentVariables: [
		{
			name: "LOCATIONS_DB_ENDPOINT",
			value: dbEndpoint,
		},
		{
			name: "PRISMA_QUERY_ENGINE_LIBRARY",
			value: "/var/task/libquery_engine-rhel-openssl-3.0.x.so.node",
		},
	],
	handler: "index.handler",
	subnets: privateSubnetIds.apply((ids) => ids),
	securityGroups: [securityGroup.apply((group) => group.id)],
	zipFilePath: "./build/locations_ingest_lambda.zip",
	datadog: {
		version,
	},
});
