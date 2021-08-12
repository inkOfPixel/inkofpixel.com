import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import {
  BlockComponentProps,
  Block,
  BlocksControls,
  InlineTextarea,
  InlineBlocks,
} from "react-tinacms-inline";

import Link from "next/link";
import { fetchGraphQL } from "@graphql/utils";
import {
  CreateFormMessageInput,
  InsertFormMessage,
  InsertFormMessageMutation,
  InsertFormMessageMutationVariables,
} from "@graphql/generated";
import { assertNever } from "@utils";
import { SocialBubbleBlockData } from "@features/page/sections/ContactsSection/blocks/SocialBubbleBlock";
import { SOCIAL_BLOCK } from "..";

export type ContactsSectionBlockData = BlockTemplateData<
  "contactsSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    email: Nullable<string>;
    sectionTitle: Nullable<string>;
    socialBubbles: SocialBubbleBlockData[];
  }
>;

interface ContactsSectionBlockProps {
  sectionTitle: string;
  index: number;
  email: string;
}

const StyledInlineBlocks = chakra(InlineBlocks);

export function ContactsSectionBlock({
  sectionTitle,
  index,
  email,
}: ContactsSectionBlockProps) {
  return (
    <Box as="section" pt={index === 0 ? "52" : "0"} w="full">
      <Flex
        w={{
          base: "full",
          xl: "1200px",
        }}
        py="0"
        px={{
          base: "6",
          sm: "10",
          xl: "0",
        }}
        my="0"
        mx="auto"
        pos="relative"
        flexDir="column"
      >
        <Box
          color="rgb(129, 82, 188)"
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="0.1em"
          pos="relative"
          w="full"
          pb="30px"
          as="h2"
          fontFamily="Roboto Mono"
          lineHeight="1.15em"
          _before={
            sectionTitle
              ? {
                  content: "''",
                  display: "block",
                  h: "2px",
                  w: "60px",
                  pos: "absolute",
                  top: "7px",
                  left: "-68px",
                  backgroundColor: "rgb(129, 82, 188)",
                }
              : undefined
          }
        >
          <InlineTextarea name="sectionTitle" />
        </Box>

        <Flex
          flexDir={{
            base: "column",
            md: "row",
          }}
        >
          <Flex
            flex={{
              base: "0 0 full",
              md: "0 0 300px",
              xl: "0 0 400px",
            }}
            mr={{
              base: "0",
              md: "20",
              lg: "36",
            }}
            flexDir="column"
          >
            <Box
              as="h2"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              fontFamily="Europa"
              fontWeight="bold"
              lineHeight="1.1em"
            >
              <InlineTextarea name="title" />
            </Box>
            <Box fontSize="sm" pt="5" color="description">
              <InlineTextarea name="subtitle" />
            </Box>
            <Link href={`mailto:${email}`} passHref>
              <Box
                as="a"
                fontSize="sm"
                pt="14"
                lineHeight="1.8em"
                textDecoration="none"
              >
                <InlineTextarea name="email" />
              </Box>
            </Link>
          </Flex>
          <ContactsForm />
        </Flex>

        <Flex justifyContent="flex-end" w="full" mb="32">
          <StyledInlineBlocks
            display="flex"
            name="socialBubbles"
            blocks={SOCIAL_BLOCK}
            direction="horizontal"
          />
        </Flex>
      </Flex>
    </Box>
  );
}

enum FormStatus {
  Idle = "idle",
  Submitting = "submitting",
  Submitted = "submitted",
}

const blankForm = {
  status: FormStatus.Idle,
  values: { name: "", email: "", message: "" },
  validationErrors: { name: null, email: null, message: null },
  submitError: null,
};

interface UpdateFieldAction {
  type: FormActionType.UpdateField;
  name: string;
  value: string;
}

interface SuccessAction {
  type: FormActionType.Success;
}

interface FailAction {
  type: FormActionType.Failed;
}

interface SubmitAction {
  type: FormActionType.Submit;
}

enum FormActionType {
  UpdateField = "update-field",
  Success = "success",
  Failed = "failed",
  Submit = "submit",
}

type FormAction = UpdateFieldAction | SuccessAction | FailAction | SubmitAction;

interface FormState {
  status: FormStatus;
  values: {
    name: string;
    email: string;
    message: string;
  };
  validationErrors: {
    name: Nullable<string>;
    email: Nullable<string>;
    message: Nullable<string>;
  };
  submitError: Nullable<string>;
}

function reducer(state: FormState, action: FormAction) {
  const regex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
  switch (action.type) {
    case FormActionType.UpdateField: {
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
        validationErrors: {
          ...state.validationErrors,
          [action.name]: null,
        },
        submitError: null,
      };
    }

    case FormActionType.Submit: {
      //Check errors
      const result: FormState["validationErrors"] = {
        name: null,
        email: null,
        message: null,
      };

      if (state.values.name.trim().length === 0) {
        result.name = "Please insert your name";
      } else {
        state.validationErrors.name = null;
      }

      if (!regex.test(state.values.email)) {
        result.email = "Please insert a valid email";
      } else {
        state.validationErrors.email = null;
      }
      if (state.values.message.trim().length == 0) {
        result.message = "Please insert a message";
      } else {
        state.validationErrors.message = null;
      }

      const isEmpty = Object.values(result).every((x) => x == null);
      console.log(isEmpty);

      return {
        ...state,
        validationErrors: result,
        status: isEmpty ? FormStatus.Submitting : FormStatus.Idle,
      };
    }

    case FormActionType.Success:
      return {
        // Display thanks page
        ...state,
        status: FormStatus.Submitted,
      };

    case FormActionType.Failed:
      return {
        // Resta in idle, setta errore e resetta i campi?
        ...state,

        submitError: "Error while sending your message",
        status: FormStatus.Idle,
      };

    default: {
      assertNever(action);
    }
  }
}

export function ContactsForm() {
  const [state, dispatch] = React.useReducer(reducer, blankForm);
  React.useEffect(() => {
    if (state.status === FormStatus.Submitting) {
      async function sendMessage() {
        const input: CreateFormMessageInput = {
          data: {
            name: state.values.name,
            email: state.values.email,
            message: state.values.message,
          },
        };
        const response = await fetchGraphQL<
          InsertFormMessageMutation,
          InsertFormMessageMutationVariables
        >(InsertFormMessage, { input });

        if (response.createFormMessage == null) {
          dispatch({ type: FormActionType.Failed });
        } else {
          dispatch({ type: FormActionType.Success });
        }
      }
      sendMessage();
    }
  }, [state.status, state.values]);

  const onFieldChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      dispatch({
        type: FormActionType.UpdateField,
        name,
        value,
      });
    },
    []
  );

  function onFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch({
      type: FormActionType.Submit,
    });
  }

  return (
    <Box
      flexWrap="wrap"
      fontFamily="Roboto Mono"
      id="contact"
      mt={{
        base: "20",
        md: "0",
      }}
      mr={{
        base: "-2.5",
        md: "0",
      }}
      display="flex"
      flexGrow={1}
      pb="20"
      flexDir={{
        base: "column",
        sm: "row",
        md: "column",
        lg: "row",
      }}
    >
      {state.status === FormStatus.Submitted && (
        <Box
          display={
            state.status === FormStatus.Submitted ? "inline-block" : "none"
          }
          pb="12"
        >
          <Text
            as="h3"
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="bold"
            fontFamily="Europa"
            lineHeight="1.1em"
            pb="5"
          >
            Thank you!
          </Text>
          <Text as="p" fontSize="sm" color="#5c5c5c">
            We&apos;ll get in touch soon.
          </Text>
        </Box>
      )}

      <Box
        noValidate
        onSubmit={onFormSubmit}
        as="form"
        display={
          state.status === FormStatus.Submitted ? "none" : "inline-block"
        }
      >
        <Box
          w={{
            base: "calc(100% - 20px)",
            sm: "calc(50% - 20px)",
            md: "calc(100% - 20px)",
            lg: "calc(50% - 20px)",
          }}
          mx="2.5"
          my="5"
          display="inline-block"
          pos="relative"
        >
          <FormControl
            id="name"
            isInvalid={state.validationErrors.name == null ? false : true}
          >
            <FormLabel
              fontWeight="400"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.1em"
              pos="relative"
              w="full"
              display="block"
              mb="0"
            >
              Name
            </FormLabel>
            <Input
              onChange={onFieldChange}
              value={state.values.name}
              id="1"
              name="name"
              borderX="none"
              borderTop="none"
              borderRadius="0"
              pos="relative"
              outline="none"
              borderBottom="1px solid rgb(148, 148, 148)"
              w="full"
              minH="10"
              py="2.5"
              px="0"
              boxSizing="border-box"
              fontSize="sm"
              resize="none"
              display="inline-block"
              lineHeight="1.4em"
              _focus={{
                "& ~ span": {
                  width: "100%",
                },
              }}
              type="text"
              placeholder="Peter Smith"
              isRequired
            />
            <FormErrorMessage pos="absolute">
              {state.validationErrors.name}
            </FormErrorMessage>
            <Box
              as="span"
              pos="absolute"
              bottom="0"
              left="0"
              w="0"
              h="1px"
              backgroundColor="dark"
              transition="all 0.4s ease 0s"
            ></Box>
          </FormControl>
        </Box>
        <Box
          w={{
            base: "calc(100% - 20px)",
            sm: "calc(50% - 20px)",
            md: "calc(100% - 20px)",
            lg: "calc(50% - 20px)",
          }}
          mx="2.5"
          my="5"
          pos="relative"
          display="inline-block"
        >
          <FormControl
            id="email"
            isInvalid={state.validationErrors.email == null ? false : true}
          >
            <FormLabel
              mb="0"
              fontWeight="400"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.1em"
              pos="relative"
              w="full"
              display="block"
            >
              Email
            </FormLabel>
            <Input
              onChange={onFieldChange}
              id="2"
              value={state.values.email}
              name="email"
              isRequired
              borderX="none"
              borderTop="none"
              borderRadius="0"
              pos="relative"
              outline="none"
              borderBottom="1px solid rgb(148, 148, 148)"
              w="full"
              minH="10"
              py="2.5"
              px="0"
              boxSizing="border-box"
              fontSize="sm"
              resize="none"
              display="block"
              lineHeight="1.4em"
              _focus={{
                "& ~ span": {
                  width: "100%",
                },
              }}
              type="email"
              placeholder="example@yourdomain.com"
            />
            <FormErrorMessage pos="absolute">
              {state.validationErrors.email}
            </FormErrorMessage>
            <Box
              as="span"
              pos="absolute"
              bottom="0"
              left="0"
              w="0"
              h="1px"
              backgroundColor="dark"
              transition="all 0.4s ease 0s"
            ></Box>
          </FormControl>
        </Box>

        <Box
          w="calc(100% - 10px)"
          mx="2.5"
          my="5"
          pos="relative"
          display="inline-block"
        >
          <FormControl
            id="message"
            isInvalid={state.validationErrors.message == null ? false : true}
          >
            <FormLabel
              mb="0"
              fontWeight="400"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.1em"
              pos="relative"
              w="full"
              display="block"
            >
              Message
            </FormLabel>
            <Input
              onChange={onFieldChange}
              id="3"
              name="message"
              value={state.values.message}
              borderX="none"
              borderTop="none"
              borderRadius="0"
              pos="relative"
              outline="none"
              borderBottom="1px solid rgb(148, 148, 148)"
              w="full"
              minH="10"
              py="2.5"
              px="0"
              boxSizing="border-box"
              fontSize="sm"
              resize="none"
              display="block"
              lineHeight="1.4em"
              _focus={{
                "& ~ span": {
                  width: "full",
                },
              }}
              type="text"
              placeholder="Hi there..."
            />
            <FormErrorMessage pos="absolute">
              {state.validationErrors.message}
            </FormErrorMessage>
            <Box
              userSelect="none"
              as="span"
              pos="absolute"
              bottom="0"
              left="0"
              w="0"
              h="1px"
              backgroundColor="dark"
              transition="all 0.4s ease 0s"
            ></Box>
          </FormControl>
        </Box>
        <Text color="red">{state.submitError}</Text>
        <Button
          type="submit"
          userSelect="none"
          borderRadius="0"
          border="1px solid black"
          color="dark"
          backgroundColor="transparent"
          fontSize="sm"
          fontWeight="normal"
          letterSpacing="0.06em"
          overflow="hidden"
          display="block"
          pos="relative"
          w="52"
          h="10"
          transition="all 0.3s ease 0s"
          cursor="pointer"
          _hover={{
            color: "white",

            "& > span:after": {
              w: "full",
            },
          }}
          mt="10"
          mr="2.5"
          mb="2.5"
        >
          <Box
            as="span"
            _after={{
              background: "rgb(22,19,56)",
              content: "''",
              pos: "absolute",
              zIndex: -1,
              transition: "all 0.3s ease 0s",
              h: "10",
              left: "0",
              top: "0",
              w: "0",
            }}
          >
            SEND
          </Box>
        </Button>
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ContactsSectionBlock index={index} {...data} />
    </BlocksControls>
  );
}

export const contactsSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Contacts Section",
    defaultItem: {
      sectionTitle: "Default section title",
      title: "Default title",
      subtitle: "Default subtitle",
      email: "hello@inkofpixel.com",
      blocks: [],
    },
    fields: [],
  },
};
