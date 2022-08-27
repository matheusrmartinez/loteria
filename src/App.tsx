import { styled } from "@stitches/react";
import { AxiosError } from "axios";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Logo from "./assets/logo_sena.svg";
import Select from "./components/Select";
import { SortedNumberList } from "./components/SortedNumberList";
import { Spinner } from "./components/Spinner";
import "./global.css";
import { contestColors } from "./theme/colors";
import { Contest, ContestData, Lottery } from "./types";
import { api } from "./utils/api";

function App() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);
  const [contestData, setContestData] = useState<ContestData>(
    {} as ContestData
  );
  const [selectedContest, setSelectedContest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSelectValueChange = (selectedContest: string) => {
    const contestNumber = getContestNumberByText(selectedContest);

    const contestId =
      contests.find((lottery) => lottery.loteriaId === contestNumber)
        ?.concursoId ?? 0;

    getContestById(contestId);
    setSelectedContest(selectedContest);
  };

  const getContestNumberByText = (selectedContest: string) => {
    return lotteries.find((contest) => contest.nome === selectedContest)?.id;
  };

  const getBackgroundColor = () => {
    const formattedText = selectedContest
      .normalize("NFD")
      .replace(/[^a-zA-Z ]/g, "")
      .replaceAll(/\s/g, "")
      .toLowerCase();
    return contestColors[formattedText || "megasena"];
  };

  useEffect(() => {
    const getLotteries = async () => {
      try {
        const { data } = await api.get<Lottery[]>("/loterias");

        setLotteries(data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error({
            data: axiosError.response.data,
            status: axiosError.response.status,
          });
        } else {
          console.log("Error", axiosError.message);
        }
      }
    };

    const getContests = async () => {
      try {
        const { data } = await api.get<Contest[]>("/loterias-concursos");

        setContests(data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error({
            data: axiosError.response.data,
            status: axiosError.response.status,
          });
        } else {
          console.log("Error", axiosError.message);
        }
      }
    };

    getContests();
    getLotteries();
  }, []);

  async function getContestById(contestId: number) {
    try {
      setIsLoading(true);
      const { data } = await api.get<ContestData>(`/concursos/${contestId}`);

      const formattedDate = format(parseISO(data.data), "dd/MM/yyyy");

      setContestData({ ...data, dataFormatada: formattedDate });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error({
          data: axiosError.response.data,
          status: axiosError.response.status,
        });
      } else {
        console.log("Error", axiosError.message);
      }
    }
  }

  const Wrapper = styled("div", {
    display: "flex",
    flexDirection: "row",
    "@media only screen and (max-width: 1023px)": {
      flexDirection: "column",
    },
  });

  const LotteryContainer = styled("div", {
    width: "40%",
    height: "100vh",
    paddingLeft: "96px",
    minWidth: "400px",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: getBackgroundColor(),
    justifyContent: "space-around",
    "@media only screen and (max-width: 1023px)": {
      height: "30vh",
      width: "100%",
      justifyContent: "space-around",
      minWidth: "875px",
      alignItems: "center",
      paddingLeft: "0px",
    },
    "@media only screen and (max-width: 872px)": {
      height: "45vh",
      minWidth: "0px",
    },
  });

  const SortedNumbersContainer = styled("div", {
    height: "100vh",
    display: selectedContest ? "flex" : "none",
    flexDirection: "column",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-around",
    "@media only screen and (max-width: 1023px)": {
      flexDirection: "column",
      height: "60vh",
      minHeight: "60vh",
      minWidth: "869px",
      width: "100%",
    },
    "@media only screen and (max-width: 872px)": {
      height: "55vh",
      minWidth: "0px",
      minHeight: "50vh",
      justifyContent: "flex-start",
    },
  });

  const LotteryFooter = styled("div", {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gap: 15,
    "@media only screen and (max-width: 1023px)": {
      alignItems: "center",
    },
  });

  const LotteryContent = styled("div", {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    "@media only screen and (max-width: 872px)": {
      flexDirection: "column",
    },
  });

  const SortedNumberFooter = styled("div", {
    marginTop: "3rem",
    width: "80%",
    textAlign: "center",
    "@media only screen and (max-width: 1023px)": {
      marginTop: 0,
      position: "absolute",
      bottom: "25px",
    },
    "@media only screen and (max-width: 872px)": {
      marginTop: 0,
      position: "absolute",
      bottom: "25px",
    },
  });

  const HiddenWrapper = styled("div", {
    display: "hidden",
    marginTop: "65px",
    "@media only screen and (max-width: 1023px)": {
      marginTop: "-175px",
    },
    "@media only screen and (max-width: 872px)": {
      marginTop: "30px",
    },
  });

  const shouldShowContestName = contestData && selectedContest && !isLoading;

  return (
    <Wrapper>
      <LotteryContainer>
        <Select
          value={selectedContest}
          onValueChange={handleOnSelectValueChange}
          options={lotteries.map((lotteries) => lotteries.nome)}
          label="Concursos"
          labelPlaceHolder="Selecione o concurso"
        />
        <LotteryContent>
          <img width={"60px"} height={"56px"} src={Logo} alt="Logo Mega" />
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "30px",
              color: "#ffffff",
              fontWeight: 700,
              wordBreak: "break-word",
            }}
          >
            {selectedContest.toUpperCase()}
          </p>
        </LotteryContent>
        <LotteryFooter>
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "14px",
              color: "#ffffff",
              fontWeight: 500,
              letterSpacing: "0.135em",
              lineHeight: "17px",
            }}
          >
            {selectedContest && "CONCURSO"}
          </p>
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "20px",
              color: "#ffffff",
              fontWeight: 700,
              lineHeight: "17px",
            }}
          >
            {shouldShowContestName &&
              `${contestData.id} - ${contestData.dataFormatada}`}
          </p>
        </LotteryFooter>
      </LotteryContainer>
      <SortedNumbersContainer>
        <HiddenWrapper />
        {isLoading ? (
          <Spinner loading={isLoading} color={getBackgroundColor()} />
        ) : (
          <SortedNumberList numbers={contestData?.numeros} />
        )}
        <SortedNumberFooter>
          <p
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
              wordBreak: "break-word",
              display: selectedContest ? "inline" : "none",
            }}
          >
            Este sorteio é meramente ilustrativo e não possui nenhuma ligação
            com a CAIXA.
          </p>
        </SortedNumberFooter>
      </SortedNumbersContainer>
    </Wrapper>
  );
}

export default App;
