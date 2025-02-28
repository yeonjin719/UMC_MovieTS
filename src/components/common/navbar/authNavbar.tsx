// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../context/LogInContext';

const AuthNavbar = () => {
    // const { isLogin } = useAuthContext();
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (isLogin) {
    //         navigate('/');
    //     }
    // }, [isLogin, navigate]);

    return (
        <nav className="flex min-h-[80px] items-center bg-[#131313] px-[40px] fixed z-[10] w-[100%]">
            <div
                onClick={() => navigate('/')}
                className="flex max-w-[300px] min-w-[50px] text-[#FF1E9D] text-[1.7rem] font-bold mr-[30px] items-center justify-center"
            >
                돌려돌려LP판
            </div>

            <div className="flex gap-[10px] ml-auto">
                <div
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-center text-white text-[15px] border-none bg-black rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
                >
                    로그인
                </div>
                <div
                    onClick={() => navigate('/signup')}
                    className="flex items-center justify-center text-white text-[15px] border-none bg-[#FF1E9D] rounded-[5px] w-[70px] h-[30px] hover:bg-white hover:text-black"
                >
                    회원가입
                </div>
            </div>
        </nav>
    );
};

export default AuthNavbar;
