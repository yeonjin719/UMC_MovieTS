import { useNavigate } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import Portal from '../common/portal/portal';
import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../context/LogInContext';
import useAuth from '../../hooks/queries/useAuth';
import { closeModal } from '../../slices/modalSlice';
import { queryClient } from '../../main';

type TWithdrawModalProps = {
    onClose: () => void;
};
const WithdrawModal = ({ onClose }: TWithdrawModalProps) => {
    const navigate = useNavigate();
    const { setIsLogin, isLogin } = useAuthContext();
    const dispatch = useDispatch();
    const { useWithdraw } = useAuth();
    const { mutate: withdrawMutate } = useWithdraw;

    const handleWithdraw = () => {
        queryClient.invalidateQueries({ queryKey: ['myInfo'] });
        if (isLogin) {
            withdrawMutate(
                {},
                {
                    onSuccess: () => {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        setIsLogin(false);
                        queryClient.invalidateQueries({ queryKey: ['myInfo'] });
                        navigate('/');
                        alert('성공적으로 탈퇴되었습니다');
                    },
                }
            );
        }
    };
    return (
        <Portal>
            <div className="flex flex-col w-full items-center justify-center absolute left-0 top-0 h-full z-10 bg-[rgba(0,0,0,0.5)]">
                <div className="w-[500px] h-[350px] relative gap-[40px] justify-center items-center text-white bg-[rgba(40,41,46)] z-10 rounded-[10px] flex flex-col p-[20px]">
                    <FaXmark
                        size={20}
                        color="white"
                        className="absolute z-10 top-[30px] right-[30px]"
                        onClick={() => dispatch(closeModal())}
                    />
                    <div className="flex text-white text-[20px]">
                        정말 탈퇴하시겠습니까?
                    </div>
                    <div className="flex gap-[40px]">
                        <button
                            className="w-[100px] pt-[5px] pb-[5px] rounded-[10px] bg-gray-300 text-black"
                            onClick={handleWithdraw}
                        >
                            예
                        </button>
                        <button
                            className="w-[100px] pt-[5px] pb-[5px] rounded-[10px] bg-pink-500 text-white"
                            onClick={() => dispatch(closeModal())}
                        >
                            아니오
                        </button>
                    </div>
                </div>
                <div
                    className="absolute w-screen h-full bg-black opacity-10 z-6 left-0 top-0"
                    onClick={onClose}
                ></div>
            </div>
        </Portal>
    );
};

export default WithdrawModal;
