interface EnvVars {
	[key: string]: string;
}

export const EnvVars: EnvVars = {
	JWT_ACCESSS_TOKEN_SECRET: process.env.JWT_ACCESSS_TOKEN_SECRET || '',
};
