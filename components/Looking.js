import Image from 'next/image';

const Looking = ({ userInfo }) => {
    return (
        <>
            <Image src={'/static/magnifying-glass.svg'} height={50} width={50}/>
            <h3>Looking for {userInfo}...</h3>
        </>
    );
}
 
export default Looking;