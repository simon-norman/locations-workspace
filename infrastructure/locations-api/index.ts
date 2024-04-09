import { aws } from "@breeze32/shared-infra";
import * as pulumi from "@pulumi/pulumi";

const awsConfig = new pulumi.Config("aws");
const awsRegion = awsConfig.require("region");

const config = new pulumi.Config();
const environment = config.require("environment");

const vpcStackRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-vpc/${environment}`,
);
const vpcId = vpcStackRef.getOutput("vpcId");
const privateSubnetIds = vpcStackRef.getOutput("privateSubnetIds");

const clusterRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-ec2-cluster/${environment}`,
);
const clusterArn = clusterRef.getOutput("arn");

const loadBalancerRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-public-load-balancer/${environment}`,
);
const loadBalancerArn = loadBalancerRef.getOutput("arn");
const loadBalancerDnsName = loadBalancerRef.getOutput("dnsName");
const listenerArn = loadBalancerRef.getOutput("listenerArn");

const envHostedZoneRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-environment-hosted-zone/${environment}`,
);
const environmentHostedZoneId = envHostedZoneRef.getOutput("zoneId");

const httpsCertificateRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-https-certificate/${environment}`,
);
const httpsCertificateArn = httpsCertificateRef.getOutput("arn");

const securityGroupsRef = new pulumi.StackReference(
	`simon-norman/main-app-eu-west-2-security-groups/${environment}`,
);
const securityGroup = securityGroupsRef.getOutput(
	"inboundAlbSecurityGroupOutboundAll",
);

new aws.PublicFargateService({
	region: awsRegion,
	name: "locations-api",
	environment,
	vpcId,
	clusterArn,
	loadBalancerArn,
	listenerArn,
	servicePort: 3000,
	serviceDockerfileTarget: "release_locations_api",
	environmentHostedZoneId,
	loadBalancerDnsName,
	serviceDockerfilePath: "../../monorepo/Dockerfile",
	serviceDockerContext: "../../monorepo",
	httpsCertificateArn,
	securityGroups: [securityGroup.apply((group) => group.id)],
	subnets: [
		privateSubnetIds.apply((ids) => ids[0]),
		privateSubnetIds.apply((ids) => ids[1]),
	],
});
