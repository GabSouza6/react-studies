import { useState } from "react";
import "./index.css";

interface Cep {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

async function buscaCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await response.json();
}

export const Cep = () => {
  const [cepData, setCepData] = useState<Cep | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function getCep(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cep = formData.get("cep") as string;

    setCepData(null);
    setError(null);

    if (cep.length !== 8) {
      setError("CEP deve conter exatamente 8 dígitos");
      return;
    }

    try {
      const cepData = await buscaCep(cep);

      if (cepData.erro) {
        setError("CEP não encontrado");
        return;
      }

      setCepData(cepData);
    } catch (error) {
      setError("Erro ao buscar CEP. Tente novamente.");
    }

    event.currentTarget.reset();
  }

  return (
    <div className="wrapper">
      <form onSubmit={getCep} className="container">
        <label htmlFor="cep">Digite seu CEP</label>

        <input type="text" name="cep" id="cep" placeholder="00000000" />

        <button type="submit">Buscar</button>

        <div className="result">
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          {cepData && (
            <div className="card">
              <p>
                <strong>CEP:</strong> {cepData?.cep}
              </p>

              <p>
                <strong>Logradouro:</strong> {cepData?.logradouro}
              </p>

              <p>
                <strong>Bairro:</strong> {cepData?.bairro}
              </p>

              <p>
                <strong>Cidade:</strong> {cepData?.localidade}
              </p>

              <p>
                <strong>Estado:</strong> {cepData?.uf}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
