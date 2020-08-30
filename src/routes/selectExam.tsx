import React, { useEffect, useState } from "react";
import { TRootState } from "../types/examTypes";
import { Heading, Button, Box, Grid, Flex, Container, Text } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../App";
import Layout from "../components/layout/Layout";
import { setExamState } from "../redux/actions";
import Paragraph from "antd/lib/skeleton/Paragraph";

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
        <>
          <Container
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
            sx={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.2)",
            }}
          />
          <Container
            sx={{
              position: "fixed",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid #888",
              width: "80%",
              boxShadow: "0 0 2px 2px rgba(0, 0, 0, 0.2)",
              zIndex: "10",
              background: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Heading>
              {`You are about to take the exam: ${examTable?.byId[selectedExam]?.name}`}
            </Heading>
            <Text>Something Something</Text>
            <Flex sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button
                variant="warning"
                sx={{ marginRight: "1rem" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setExam(selectedExam)}>Take Exam</Button>
            </Flex>
          </Container>
        </>
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
