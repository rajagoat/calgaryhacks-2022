import magnifyingIcon from '../public/static/magnifiying-glass.svg';
import Image from 'next/image';

const Looking = ({ userInfo }) => {
    return (
        <>
            <Image src={magnifyingIcon} height={50} width={50}/>
            <h3>Looking for {userInfo}...</h3>
        </>
    );
}
 
export default Looking;