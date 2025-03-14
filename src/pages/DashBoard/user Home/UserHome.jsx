
import UseAuth from '../../../hooks/UseAuth';

const UserHome = () => {
    const {User} = UseAuth()

    return (
        <div>
            <h1 className=' text-3xl'> Hi, welcome &nbsp;
            {
                User.displayName ? User.displayName : User.email
            }
            </h1>
        </div>
    );
};

export default UserHome;