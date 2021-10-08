import { FullContainerStyled } from './styles';

const FullContainer = ({ children }) => {
    return ( 
        <FullContainerStyled>
            {children}
        </FullContainerStyled>
    )
}

export default FullContainer;