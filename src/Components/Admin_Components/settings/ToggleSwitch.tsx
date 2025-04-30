import { motion } from "framer-motion";
type ToggleProps = {
	label: string;
	isOn: boolean;
	onToggle: () => void;
};

const ToggleSwitch = ({ label, isOn, onToggle }: ToggleProps) => {
	return (
		<div className='flex items-center justify-between py-3'>
			<span className='text-gray-300'>{label}</span>
			<button
				className={`
        relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
        ${isOn ? "bg-indigo-600" : "bg-gray-600"}
        `}
				onClick={onToggle}
			>
				<motion.span
					layout
					className={`
						inline-block size-4 bg-white rounded-full
						${isOn ? "translate-x-6" : "translate-x-1"}
					`}
				/>
			</button>
		</div>
	);
};
export default ToggleSwitch;