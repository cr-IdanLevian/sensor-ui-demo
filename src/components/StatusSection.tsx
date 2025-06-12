import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export type StatusType =
	| 'Connected'
	| 'Disconnected'
	| 'Connecting'
	| 'Ready'
	| 'Initializing'
	| 'Error';

interface StatusSectionProps {
	connectionStatus: StatusType;
	appStatus: StatusType;
}

const StatusSection: React.FC<StatusSectionProps> = ({
	connectionStatus,
	appStatus,
}) => {
	const { translation, direction } = useTranslation();

	const getStatusClass = (status: StatusType) => {
		switch (status) {
			case 'Connected':
			case 'Ready':
				return 'status-connected';
			case 'Disconnected':
			case 'Error':
				return 'status-disconnected';
			case 'Connecting':
			case 'Initializing':
				return 'status-loading';
			default:
				return 'status-disconnected';
		}
	};

	const getStatusText = (status: StatusType) => {
		switch (status) {
			case 'Connected':
				return translation.status.connected;
			case 'Disconnected':
				return translation.status.disconnected;
			case 'Connecting':
				return translation.status.connecting;
			case 'Ready':
				return translation.status.ready;
			case 'Initializing':
				return translation.status.initializing;
			case 'Error':
				return translation.status.error;
			default:
				return translation.status.error;
		}
	};

	return (
		<div className={`status-section ${direction}`}>
			<div className='status-row'>
				<span className='status-label'>{translation.status.connection}</span>
				<span className={`status-value ${getStatusClass(connectionStatus)}`}>
					{getStatusText(connectionStatus)}
				</span>
			</div>
			<div className='status-row'>
				<span className='status-label'>{translation.status.appStatus}</span>
				<span className={`status-value ${getStatusClass(appStatus)}`}>
					{getStatusText(appStatus)}
				</span>
			</div>
		</div>
	);
};

export default StatusSection;
