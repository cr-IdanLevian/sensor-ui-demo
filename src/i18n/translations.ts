export type Language = 'en' | 'he' | 'ja';

export interface Translation {
	status: {
		connection: string;
		appStatus: string;
		connected: string;
		disconnected: string;
		connecting: string;
		ready: string;
		initializing: string;
		error: string;
	};
	buttons: {
		refresh: string;
		settings: string;
		about: string;
		exit: string;
	};
}

export const translations: Record<Language, Translation> = {
	en: {
		status: {
			connection: 'Connection:',
			appStatus: 'App status:',
			connected: 'Connected',
			disconnected: 'Disconnected',
			connecting: 'Connecting',
			ready: 'Ready',
			initializing: 'Initializing',
			error: 'Error',
		},
		buttons: {
			refresh: 'Refresh',
			settings: 'Settings',
			about: 'About',
			exit: 'Exit',
		},
	},
	he: {
		status: {
			connection: 'חיבור:',
			appStatus: 'סטטוס האפליקציה:',
			connected: 'מחובר',
			disconnected: 'מנותק',
			connecting: 'מתחבר',
			ready: 'מוכן',
			initializing: 'אתחול',
			error: 'שגיאה',
		},
		buttons: {
			refresh: 'רענן',
			settings: 'הגדרות',
			about: 'אודות',
			exit: 'יציאה',
		},
	},
	ja: {
		status: {
			connection: '接続:',
			appStatus: 'アプリ状態:',
			connected: '接続済み',
			disconnected: '切断',
			connecting: '接続中',
			ready: '準備完了',
			initializing: '初期化中',
			error: 'エラー',
		},
		buttons: {
			refresh: '更新',
			settings: '設定',
			about: 'バージョン情報',
			exit: '終了',
		},
	},
};

export const getLanguageDirection = (language: Language): 'ltr' | 'rtl' => {
	return language === 'he' ? 'rtl' : 'ltr';
};

export const getLanguageName = (language: Language): string => {
	switch (language) {
		case 'en':
			return 'English';
		case 'he':
			return 'עברית';
		case 'ja':
			return '日本語';
		default:
			return 'English';
	}
};
