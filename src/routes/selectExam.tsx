import React, { useEffect, useState, useContext } from "react";
import { TRootState } from "../types/examTypes";
import { Heading, Button, Box, Grid, Flex, Card, Text } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../App";
import Layout from "../components/layout/Layout";
import { setExamState } from "../redux/actions";
import Modal from "../components/layout/basics/modal";
import { UserContext } from "../services/userContext";

export default function SelectExam() {
  const examTable = useSelector((state: TRootState) => state.examTable);
  const examState = useSelector((state: TRootState) => state.examState);

  const { user } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (examState.currentExamId && examState.currentQuestionId) {
      history.push("/exam/");
    }
  }, [examState]);

  const setExam = (examId) => {
    // set exam state
    const firstQuestionId = examTable.byId[examId].questionsById[0];

    dispatch(
      setExamState({
        newTable: {
          currentExamId: examId,
          currentQuestionIndex: 0,
          currentQuestionId: firstQuestionId,
          currentTime: null,
          timerIsActive: true,
          examFinished: false,
        },
      })
    );
  };

  return (
    <>
      {showModal && (
        <Modal
          handleOk={() => setExam(selectedExam)}
          setShowModal={setShowModal}
        >
          <Flex sx={{ flexDirection: "colum" }}>
            <Heading>
              {`You are about to take the exam: ${examTable?.byId[selectedExam]?.name}`}
            </Heading>
            <Text>
              Please read the following carefully and make sure you understand
              everything. Also make sure the your data provided below is
              correct. If you run into trouble please immediately contact your
              exam supervisor.
            </Text>

            <Text>Your name: {user.name}</Text>
            <Text>Your identification code: {user._id}</Text>

            <Text>
              This exam is an partial open book exam. You can access any
              material you like. You still have to take the exam on your own.
              Further, instead of an an overall time limit, this exam utilizes
              per question time constraints. Keep an eye on the countdown on the
              bottom left corner. You can choose to either manually submit your
              answers or your given answer will be automatically submitted if
              the time frame for a question is up.
            </Text>

            <Text>
              You will encounter either free text questions or multiple choice
              questions. Make sure you do not exceed the word limit. A live word
              counter is found above your answer.
            </Text>

            <Text>
              To ensure that your exam will run smoothly, ensure your device is
              plugged into power and connected to the internet. We do not advise
              you to start the exam if your device is heavily outdated or you
              experience frequent crashes. It lays in your responsibility to
              ensure your device is working properly.
            </Text>

            <Text>
              By continuing to the exam you verify that you are taking the exam
              on your own without any help. If you understand the above and want
              to take the exam, please select "Continue".
            </Text>
          </Flex>
        </Modal>
      )}
      <Layout
        header={<Heading as="h3">Exam overview</Heading>}
        mainContent={
          <>
            <Flex sx={{ flexDirection: "column", justifyContent: "center" }}>
              <Card
                variant="blueBorder"
                sx={{
                  maxWidth: "20rem",
                  marginBottom: "2rem",
                  border: "3px solid #07c",
                  borderRadius: "10px",
                  alignSelf: "center",
                }}
              >
                <Heading as="h4">Welcome {user.name},</Heading>
                <Text>
                  This is the prototype of e-examination tool <i>XM</i>. Choose
                  an exam from the list down below.
                </Text>
              </Card>
              {examTable.allIds.map((idx) => {
                return (
                  <Grid
                    columns={["1fr 1fr 1fr"]}
                    sx={{
                      margin: "auto",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid black",
                      width: ["100%", "100%", "60%"],
                    }}
                  >
                    <Box sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
                      {examTable.byId[idx].name
                        ? examTable.byId[idx].name
                        : examTable.byId[idx].examId}
                    </Box>
                    <Box>
                      {examTable.byId[idx].dueDate
                        ? new Date(examTable.byId[idx].dueDate).toLocaleString(
                            "de-De"
                          )
                        : "open"}
                    </Box>
                    <Button
                      sx={{ maxWidth: "7rem", placeSelf: "end" }}
                      onClick={() => {
                        setShowModal(true);
                        setSelectedExam(idx);
                      }}
                    >
                      Take Exam
                    </Button>
                  </Grid>
                );
              })}
            </Flex>
          </>
        }
      />
    </>
  );
}
