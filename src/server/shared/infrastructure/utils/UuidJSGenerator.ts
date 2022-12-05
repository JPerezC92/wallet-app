import { v4 } from 'uuid';

import { UuidGenerator } from '@/SharedServer/domain/UuidGenerator';

export const UuidJSGenerator = (): UuidGenerator => {
	return {
		generate: () => v4(),
	};
};
