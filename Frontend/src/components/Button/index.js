import { ButtonWrapper } from "./styles";

const Button = ({
    type,
    shape,
    size,
    onClick,
    icon,
    label,
    disabled,
    loading
}) => {
    return (
        <ButtonWrapper 
            type={type} 
            shape={shape}
            size={size}
            onClick={onClick}
            icon={icon}
            disabled={disabled == null ? false : disabled}
            loading={loading == null ? false : loading}
        >
            {label}
        </ButtonWrapper>
    )
}

export default Button;