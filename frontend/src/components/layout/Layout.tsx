import React, { Suspense } from "react";
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
      <Grid columns={[1, "2fr 3fr", "2fr 3fr"]} gap={3}>
        {sidePanel && <Card>{sidePanel}</Card>}
        {mainContent && (
          <Card>
            <Suspense fallback={<div>Loading...</div>}>{mainContent}</Suspense>
          </Card>
        )}
      </Grid>
    </Container>
  );
}
