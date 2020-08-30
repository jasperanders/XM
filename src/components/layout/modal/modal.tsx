import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Heading, Container, Flex, Button } from "theme-ui";
import { TRootState } from "../../../types/examTypes";

export default function ExamProgress({ setShowModal, handleOk, children }) {
  return (
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
        {children}
        <Flex sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            variant="warning"
            sx={{ marginRight: "1rem" }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleOk}>Take Exam</Button>
        </Flex>
      </Container>
    </>
  );
}
