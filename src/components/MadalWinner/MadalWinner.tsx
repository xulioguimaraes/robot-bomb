interface ModalWinnerProps {
  isModalWinnerOpen: boolean;
}
export const ModalWinner = ({ isModalWinnerOpen }: ModalWinnerProps) => {
  return (
    <>
    {isModalWinnerOpen && <div>Você venceu</div>}
      
    </>
  );
};
