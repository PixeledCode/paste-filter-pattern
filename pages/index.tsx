import { Box } from "@twilio-paste/core/box";
import { Heading } from "@twilio-paste/core/heading";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import type { NextPage } from "next";
import Head from "next/head";
import { DefaultFilter } from "../components/filter/DefaultFilter";
import { STATIC_TABLE_DATA } from "../components/filter/constants";
import type { FilterListType } from "../components/filter/types";

const currentFilterList: FilterListType = ["roomType", "dateCompleted"];
const addFiltersList: FilterListType = [
  "roomSid",
  "uniqueName",
  "participants",
];
const recommendedFiltersList: FilterListType = ["uniqueName", "participants"];

const Home: NextPage = () => {
  return (
    <Box as="main" padding="space70">
      <Head>
        <title>Paste NextJS App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" variant="heading10">
        Welcome to the the Paste Next.JS App!
      </Heading>

      <Paragraph>
        Everything you need to get started using Paste in a Production app.
        Start by editing <code>pages/index.tsx</code>
      </Paragraph>
      <Separator orientation="horizontal" verticalSpacing="space120" />

      <Box>
        <DefaultFilter
          data={STATIC_TABLE_DATA}
          withSearch
          filterList={currentFilterList}
          addFiltersList={addFiltersList}
          recommendedFiltersList={recommendedFiltersList}
        />
      </Box>
    </Box>
  );
};

export default Home;
