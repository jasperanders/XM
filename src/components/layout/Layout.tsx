import React, { Suspense, useContext } from "react";
import { Button, Grid, Card, Container, Flex } from "theme-ui";
import { UserContext } from "../../services/userContext";

export default function Layout({
  sidePanel = undefined,
  mainContent = undefined,
  header = undefined,
}) {
  const { wipeUser } = useContext(UserContext);

  const columns = sidePanel ? [1, "2fr 3fr", "2fr 3fr"] : [1];
  return (
    <Container variant="masterContainer">
      {header && (
        <Container>
          <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {header}
            <Button onClick={wipeUser}>Logout</Button>
          </Flex>
        </Container>
      )}
      <Grid columns={columns} gap={3}>
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
