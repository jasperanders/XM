import React, { useEffect, useState } from "react";
import { TRootState } from "../types/examTypes";
import { Heading, Button, Box, Grid, Flex, Container, Text } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../App";
import Layout from "../components/layout/Layout";
import { setExamState } from "../redux/actions";
import Modal from "../components/layout/basics/modal";

export default function SelectExam() {
  const examTable = useSelector((state: TRootState) => state.examTable);
  const examState = useSelector((state: TRootState) => state.examState);

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
          <Heading>
            {`You are about to take the exam: ${examTable?.byId[selectedExam]?.name}`}
          </Heading>
          <Text>Something Something</Text>
        </Modal>
      )}
      <Layout
        header={<Heading as="h3">Exam overview</Heading>}
        mainContent={
          <>
            <Flex sx={{ flexDirection: "column", justifyContent: "center" }}>
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
