import React, { useEffect } from "react";
import { Container, Flex, Button, Card } from "theme-ui";

export default function Modal({ setShowModal, handleOk, children, ...props }) {
  useEffect(() => {
    if (props.timeModal) {
      console.log("yes");
    }
    return () => {
      console.log("cleanup");
    };
  });

  return (
    <>
      <Container
        onClick={(e) => {
          e.preventDefault();
          if (!props.timeModal) {
            setShowModal(false);
          }
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
      <Card
        variant="primary"
        sx={{
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          zIndex: "10",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
        <Flex sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
          {!props.timeModal && (
            <Button
              variant="warning"
              sx={{ marginRight: "1rem" }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          )}
          <Button onClick={handleOk}>
            {props.timeModal ? "Continue" : "Take Exam"}
          </Button>
        </Flex>
      </Card>
    </>
  );
}
