// Generated by https://quicktype.io

export interface Terraform {
	version: number;
	terraform_version: string;
	serial: number;
	lineage: string;
	outputs: Outputs;
	resources: Resource[];
	check_results: null;
}

export interface Outputs {
	deploy_key: DeployKey;
}

export interface DeployKey {
	value: Value;
	type: Array<Value | string>;
	sensitive: boolean;
}

export interface Value {
	create_date: string;
	encrypted_secret: null | string;
	encrypted_ses_smtp_password_v4: null | string;
	id: string;
	key_fingerprint: null | string;
	pgp_key: null | string;
	secret: string;
	ses_smtp_password_v4: string;
	status: string;
	user: string;
}

export interface Resource {
	mode: Mode;
	type: string;
	name: string;
	provider: Provider;
	instances: Instance[];
	module?: string;
}

export interface Instance {
	schema_version: number;
	attributes: Attributes;
	sensitive_attributes: any[];
	private?: string;
	dependencies?: string[];
	index_key?: number;
}

export interface Attributes {
	id: string;
	json?: string;
	override_json?: null;
	override_policy_documents?: null;
	policy_id?: null | string;
	source_json?: null;
	source_policy_documents?: null;
	statement?: Statement[];
	version?: string;
	create_date?: string;
	encrypted_secret?: null;
	encrypted_ses_smtp_password_v4?: null;
	key_fingerprint?: null;
	pgp_key?: null;
	secret?: string;
	ses_smtp_password_v4?: string;
	status?: string;
	user?: string;
	arn?: string;
	description?: string;
	name?: string;
	name_prefix?: null;
	path?: string;
	policy?: string;
	tags?: Tags;
	tags_all?: Tags;
	force_destroy?: boolean;
	permissions_boundary?: null;
	unique_id?: string;
	policy_arn?: string;
	assign_generated_ipv6_cidr_block?: boolean;
	cidr_block?: string;
	default_network_acl_id?: string;
	default_route_table_id?: string;
	default_security_group_id?: string;
	dhcp_options_id?: string;
	enable_classiclink?: boolean;
	enable_classiclink_dns_support?: boolean;
	enable_dns_hostnames?: boolean;
	enable_dns_support?: boolean;
	enable_network_address_usage_metrics?: boolean;
	instance_tenancy?: string;
	ipv4_ipam_pool_id?: null;
	ipv4_netmask_length?: null;
	ipv6_association_id?: string;
	ipv6_cidr_block?: string;
	ipv6_cidr_block_network_border_group?: string;
	ipv6_ipam_pool_id?: string;
	ipv6_netmask_length?: number;
	main_route_table_id?: string;
	owner_id?: string;
	account_id?: string;
	user_id?: string;
	dns_suffix?: string;
	partition?: string;
	reverse_dns_prefix?: string;
	registry_id?: string;
	repository?: string;
	encryption_configuration?: EncryptionConfiguration[];
	force_delete?: null;
	image_scanning_configuration?: ImageScanningConfiguration[];
	image_tag_mutability?: string;
	repository_url?: string;
	timeouts?: null;
	vpc_id?: string;
}

export interface EncryptionConfiguration {
	encryption_type: string;
	kms_key: string;
}

export interface ImageScanningConfiguration {
	scan_on_push: boolean;
}

export interface Statement {
	actions: string[];
	condition: any[];
	effect: string;
	not_actions: any[];
	not_principals: any[];
	not_resources: any[];
	principals: Principal[];
	resources: string[];
	sid: string;
}

export interface Principal {
	identifiers: string[];
	type: string;
}

export interface Tags {
	Environment: Environment;
	Service?: string;
	Name?: Environment;
}

export enum Environment {
	Corporate = "corporate",
	Development = "development",
}

export enum Mode {
	Data = "data",
	Managed = "managed",
}

export enum Provider {
	ProviderRegistryTerraformIoHashicorpAws = 'provider["registry.terraform.io/hashicorp/aws"]',
}