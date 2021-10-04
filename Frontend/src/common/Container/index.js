import { StyledContainer } from "./styles";

const Container = ({
    border,
    children,
}) => {

    return (
        <StyledContainer border={border}>
            {children}
        </StyledContainer>
    )
    
}

export default Container;