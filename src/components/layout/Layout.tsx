import React from "react";
import { Box, Grid, Card, Container, Flex } from "theme-ui";

export default function Layout({
  sidePanel = undefined,
  mainContent = undefined,
  header = undefined,
}) {
  const columns = sidePanel ? [1, "1fr 1fr"] : [1];
  return (
    <Container variant="masterContainer">
      {header && <Container>{header}</Container>}
      <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
        {sidePanel && (
          <Box>
            <Card>{sidePanel}</Card>
          </Box>
        )}
        {mainContent && <Card sx={{ flexGrow: 0 }}>{mainContent}</Card>}
      </Flex>
    </Container>
  );
}
