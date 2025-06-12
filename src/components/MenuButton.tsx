import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface MenuButtonProps {
	label: string;
	icon?: string;
	onClick: () => void;
	isDanger?: boolean;
	className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
	label,
	icon,
	onClick,
	isDanger = false,
	className = '',
}) => {
	const { direction } = useTranslation();
	const buttonClass = `menu-item ${direction} ${
		isDanger ? 'danger' : ''
	} ${className}`.trim();

	return (
		<button className={buttonClass} onClick={onClick}>
			{icon && <span className='menu-icon'>{icon}</span>}
			<span className='menu-label'>{label}</span>
		</button>
	);
};

export default MenuButton;
