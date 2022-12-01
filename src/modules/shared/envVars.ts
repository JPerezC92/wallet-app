interface EnvVars {
	[key: string]: string;
}

export const EnvVars: EnvVars = {
	webURL: process.env.NEXT_PUBLIC_WEB_URL || '',
	walletApiURL: process.env.NEXT_PUBLIC_WALLET_API_URL || '',
};
