import { ButtonWrapper } from "./styles";

const Button = ({
    type,
    shape,
    size,
    onClick,
    icon,
    label,
    disabled
}) => {
    return (
        <ButtonWrapper 
            type={type} 
            shape={shape}
            size={size}
            onClick={onClick}
            icon={icon}
            disabled={disabled == null ? false : disabled}
        >
            {label}
        </ButtonWrapper>
    )
}

export default Button;