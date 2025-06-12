import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import StatusSection, { type StatusType } from './StatusSection';
import MenuButton from './MenuButton';

interface ContextMenuProps {
	connectionStatus: StatusType;
	appStatus: StatusType;
	onRefresh: () => void;
	onSettings: () => void;
	onAbout: () => void;
	onExit: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
	connectionStatus,
	appStatus,
	onRefresh,
	onSettings,
	onAbout,
	onExit,
}) => {
	const { translation, direction } = useTranslation();

	return (
		<div className={`menu-container ${direction}`}>
			<StatusSection
				connectionStatus={connectionStatus}
				appStatus={appStatus}
			/>

			<div className='menu-separator'></div>

			<div className='menu-buttons'>
				<MenuButton
					label={translation.buttons.refresh}
					icon='🔄'
					onClick={onRefresh}
				/>

				<MenuButton
					label={translation.buttons.settings}
					icon='⚙️'
					onClick={onSettings}
				/>

				<MenuButton
					label={translation.buttons.about}
					icon='ℹ️'
					onClick={onAbout}
				/>

				<div className='menu-separator'></div>

				<MenuButton
					label={translation.buttons.exit}
					icon='❌'
					onClick={onExit}
					isDanger={true}
				/>
			</div>
		</div>
	);
};

export default ContextMenu;
