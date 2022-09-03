/* eslint-disable react/no-children-prop */
import { useAtom, atom } from "jotai";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import useSWR, { mutate } from "swr";
import {
  useToast,
  useDisclosure,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tooltip,
  Tr,
  Flex,
  Th,
  Td,
  Link,
  Spinner,
  InputRightElement,
  Button,
  Box,
  Text,
  PinInput,
  PinInputField,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { Input, InputGroup } from "@chakra-ui/react";
const subAtom = atom("");
const domainAtom = atom("");
const secretAtom = atom("");
export default function Test() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [domain, setdomain] = useAtom(domainAtom);
  const [secret, setsecret] = useAtom(secretAtom);
  const [hasMounted, setHasMounted] = React.useState(false);
  const [suburl, setsuburl] = useAtom(subAtom);
  const [subtitle, setsubtitle] = useAtom(subAtom);
  const { data } = useSWR(`https://rssandmore.gcy.workers.dev/1/feeds`);
  React.useEffect(() => {
    setdomain(location.host)
    setsecret(location.pathname.substring(1))
    setHasMounted(true);
  }, [setdomain, setsecret]);
  const handledelete = async (e) => {
    e.preventDefault();
    console.log(e);
    let id = e.currentTarget.getAttribute("id");
    const url = `https://www.nmbxd1.com/t/${id}`;
    const res = await fetch(`https://rssandmore.gcy.workers.dev/1/deleteitem`, {
      method: "post",
      body: JSON.stringify({ url: url }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status != 0) {
          toast({
            position: "bottom-right",
            title: "Error!",
            description: r.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom-right",
            title: "Delete succeed!",
            description: r.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      });
    mutate(`https://rssandmore.gcy.workers.dev/1/feeds`);
  };
  const handlesub = async (e) => {
    console.log(suburl);
    const res = await fetch(`https://rssandmore.gcy.workers.dev/1/subitem`, {
      method: "post",
      body: JSON.stringify({ url: suburl }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status != 0) {
          toast({
            position: "bottom-right",
            title: "Error!",
            description: r.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom-right",
            title: "Success!",
            description: r.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      });
    mutate(`https://rssandmore.gcy.workers.dev/1/feeds`);
  };
  const handleActive = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget.getAttribute("state"));
    const res = await fetch(`https://rssandmore.gcy.workers.dev/1/active`, {
      method: "POST",
      body: JSON.stringify({
        url: e.currentTarget.getAttribute("url"),
        state: e.currentTarget.getAttribute("state") === "on" ? false : true,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status != 0) {
          toast({
            position: "bottom-right",
            title: "Error!",
            description: r.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom-right",
            title: "succeed!",
            description: r.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      });
    mutate(`https://rssandmore.gcy.workers.dev/1/feeds`);
  };
  const handleTelegraph = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget.getAttribute("state"));
    const res = await fetch(`https://rssandmore.gcy.workers.dev/1/telegraph`, {
      method: "POST",
      body: JSON.stringify({
        url: e.currentTarget.getAttribute("url"),
        state: e.currentTarget.getAttribute("state") === "on" ? false : true,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status != 0) {
          toast({
            position: "bottom-right",
            title: "Error!",
            description: r.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom-right",
            title: "succeed!",
            description: r.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      });
    mutate(`https://rssandmore.gcy.workers.dev/1/feeds`);
  };
  const handleTitle = async (e) => {
    e.preventDefault();
    let url = e.currentTarget.getAttribute("url");
    const res = await fetch(`https://rssandmore.gcy.workers.dev/1/title`, {
      method: "post",
      body: JSON.stringify({
        url: url,
        title: suburl,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.status != 0) {
          toast({
            position: "bottom-right",
            title: "Error!",
            description: r.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "bottom-right",
            title: "Edit succeed!",
            description: r.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      });
    mutate(`https://rssandmore.gcy.workers.dev/1/feeds`);
  };
  if (!data || !hasMounted) {
    return (
      <Box w="100%" align="center">
        <Spinner size="xl" my="80" />
      </Box>
    );
  }
  return (
    <>
      <Box w="md" maxW="100%" mx="auto" my="10">
        <Box>
          <Text fontSize="4xl" fontWeight="bold" align="center">
            X岛匿名版 串监视器
          </Text>
          <Text align="center" fontSize="2xl" fontWeight="bold">
            Subscribe!
          </Text>
          <Box
            w="md"
            maxW="100%"
            mx="auto"
            my="3"
            align="center"
          >
            <Text fontSize="md" fontWeight="light" align="center">
              在下方输入串号
            </Text>
            <PinInput
              size="md"
              onChange={(value) => setsuburl(value) && console.log(suburl)}
              onComplete={(value) => setsuburl(value) && console.log(suburl) && handlesub}
              PinInput={true}
            >
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
            </PinInput>
            <Button
              size="md"
              onClick={handlesub}
              variant="outline"
              colorScheme="black"
            >
              GO!
            </Button>
          </Box>
          <Text align="center" fontSize="2xl">
            {data.length} items
          </Text>
          <Table size="xs">
            <Thead>
              <Tr>
                <Tooltip label="active" placement="auto">
                  <Th>act</Th>
                </Tooltip>
                <Th>title</Th>
                <Tooltip label="telegraph" placement="auto">
                  <Th>TG</Th>
                </Tooltip>
                <Tooltip label="ReplyCount" placement="auto">
                  <Th>RPL</Th>
                </Tooltip>
                <Tooltip label="ReplyCount" placement="auto">
                  <Th>DEL</Th>
                </Tooltip>
               </Tr>
            </Thead>
            <Tbody>
              {data.map((feed) => (
                <Tr key={feed.url}>
                  <Td>
                    <Tooltip label="Click to change!" placement="auto">
                      <Button
                        id={feed.id}
                        state={feed.active ? "on" : "off"}
                        variant="ghost"
                        isChecked={feed.active}
                        onClick={handleActive}
                        url={feed.url}
                      >
                        <Box
                          w="2"
                          h="2"
                          border="1px"
                          bg={feed.active ? "green.500" : "red.500"}
                          borderRadius="full"
                        ></Box>
                      </Button>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Popover placement="top-start">
                      <PopoverTrigger>
                          <Button variant="ghost" size="xs" fontSize="s" fontWeight="light">
                            {feed.title}
                          </Button>
                      </PopoverTrigger>
                      <PopoverContent boxShadow="black">
                        <PopoverHeader fontWeight="semibold">
                          重命名标题！
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody align="center">
                          <Text>请重新输入</Text>
                          <Text  fontSize="xl" fontWeight="bold" align="center">{feed.title}</Text>
                          <Text>的标题！</Text>
                          <InputGroup size="sm">
                            <Input
                              focusBorderColor={colorMode === "light" ? "black" : "black"}
                              pr="2rem"
                              placeholder="重新输入标题"
                              value={subtitle}
                              variant="outline"
                              onChange={(e) => setsubtitle(e.target.value)}
                            />
                            <InputRightElement width="3.5rem" mx="0.5">
                              <Button
                                h="1.75rem"
                                size="xs"
                                onClick={handleTitle}
                                variant="outline"
                                colorScheme="black"
                                id={feed.id}
                                url={feed.url}
                              >
                                Change
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>

                  <Td>
                    <Tooltip label="Click to change!" placement="auto">
                      <Button
                        id={feed.id}
                        url={feed.url}
                        state={feed.telegraph ? "on" : "off"}
                        variant="ghost"
                        isChecked={feed.telegraph}
                        onClick={handleTelegraph}
                      >
                        <Box
                          w="2"
                          h="2"
                          border="1px"
                          bg={feed.telegraph ? "green.500" : "red.500"}
                          borderRadius="full"
                        ></Box>
                      </Button>
                    </Tooltip>
                  </Td>
                  <Td>
                    <Link href={feed.url} fontSize="s" fontWeight="light">{feed.ReplyCount}</Link>
                  </Td>
                  <Td>
                    <Popover placement="top-start" colorScheme="black">
                      <PopoverTrigger>
                        <Button variant="ghost" size="xs">
                          Delete
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent boxShadow="black">
                        <PopoverHeader fontWeight="semibold">
                          Be careful!
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody align="center">
                          <Text>{"Delete " + feed.title + " ?"}</Text>
                          <Button
                            my="2"
                            variant="outline"
                            size="sm"
                            borderColor="black"
                            id={feed.id}
                            onClick={handledelete}
                          >
                            Confirm!
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <footer>
        <Flex
          mt="100px"
          borderTop="1px"
          mx="auto"
          justify="flex-end"
          px={8}
          py={4}
          width="100%"
          maxWidth="md"
        >
          <Link href="https://github.com/Ovler-Young/rssandmore" isExternal>
            <Button variant="ghost" size="sm" rightIcon={<AiFillGithub />}>
              GitHub
            </Button>
          </Link>
        </Flex>
      </footer>
    </>
  );
}
