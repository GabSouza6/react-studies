import Camiseta from "../../public/images/camiseta.png";

const CardProduct = () => {
  return (
    <div className=" text-white max-w-sm overflow-hidden rounded-2xl shadow-lg">
      <img src={Camiseta} alt="Camiseta Dev em Dobro" />

      <div className="bg-[#130234] py-10 px-5 flex flex-col">
        <p>Camiseta Dev em Dobro</p>

        <div className="py-4">
          <p>Cor: roxa</p>
          <p>Tamanho M</p>
        </div>

        <p className="self-end text-[#6BB27C] text-lg font-semibold pb-2">R$ 89,00</p>

        <button className="bg-purple-600 cursor-pointer py-3 rounded-sm hover:bg-purple-700 ">Adicionar ao carrinho</button>
      </div>
    </div>
  );
};

export default CardProduct;
