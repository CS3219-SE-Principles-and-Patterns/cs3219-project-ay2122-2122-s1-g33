import { ButtonWrapper } from "./styles";

const Button = ({
    type,
    shape,
    size,
    onClick,
    icon,
    label
}) => {
    return (
        <ButtonWrapper 
            type={type} 
            shape={shape}
            size={size}
            onClick={onClick}
            icon={icon}
        >
            {label}
        </ButtonWrapper>
    )
}

export default Button;