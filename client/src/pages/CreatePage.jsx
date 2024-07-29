import {
  Flex,
  Input,
  Box,
  useColorModeValue,
  SimpleGrid,
  CheckboxGroup,
  Checkbox,
  AspectRatio,
  Container,
  Image,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddIngredientForm from "../components/AddIngredientsForm";

import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_POST, UPDATE_TAG, ADD_INGREDIENT } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME, QUERY_TAGS } from "../utils/queries";
import usePreviewImg from "../hooks/usePreviewImg";
import Auth from "../utils/auth";

const CreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Click to Enter Post Title");
  const [detail, setDetail] = useState("");

  const [ingredients, setIngredients] = useState("");
  const handleChildData = (data) => {
    setIngredients(data); // Update the parent state with data from the child component
  };

  //react Quill Editor toolbar options
  const toolbarOptions = [
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["bold", "italic", "underline"],
    ["image"],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: 1 }, { header: 2 }],
    [{ align: [] }],
    ["clean"],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }

  const { loading: loadingTag, data: dataTag } = useQuery(QUERY_TAGS);
  const tags = dataTag?.tags || [];

  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  // console.log(imgUrl);

  const [postTags, setPostTags] = useState([]);

  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [QUERY_POSTS, "getPosts", QUERY_ME, "me"],
  });
  const [addIngredient, { error: addIngredientError }] =
    useMutation(ADD_INGREDIENT);

  const [updateTag, { error: updateTagError }] = useMutation(UPDATE_TAG);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "tag") {
      if (postTags.includes(value)) {
        const index = postTags.indexOf(value);
        const newTags = postTags.splice(index, 1);
        setPostTags(newTags);
      } else if (!postTags.includes(value)) {
        postTags.push(value);
      }

      setPostTags(postTags);
      // console.log(postTags.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: { title: title, coverUrl: imgUrl, detail: detail },
      });

      const newPost = data?.addPost;
      console.log(newPost);

      if (postTags) {
        postTags.map(
          async (postTag) =>
            await updateTag({
              variables: { tagId: postTag, postId: newPost._id },
            })
        );
      }

      if (ingredients) {
        ingredients.map(
          async (ingredient) =>
            await addIngredient({
              variables: {
                postId: newPost._id,
                material: ingredient.material,
                amount: ingredient.amount,
              },
            })
        );
      }

      navigate("/me");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container py={12}>
      <AspectRatio ratio={3 / 2}>
        <Image
          name="coverUrl"
          onClick={() => fileRef.current.click()}
          onChange={handleChange}
          w={"full"}
          objectFit="cover"
          src={
            imgUrl ||
            "https://res.cloudinary.com/dkeswd23y/image/upload/v1722083874/mjmxbi8ekeyklqfolaxl.jpg"
          }
          alt="Cover Image"
        />
      </AspectRatio>
      <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />

      <Editable
        my={4}
        textAlign={"center"}
        fontSize="1.8em"
        fontWeight={"bold"}
        defaultValue={title}
      >
        <EditablePreview />
        <EditableInput name="title" onChange={handleChange} />
      </Editable>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" fontWeight={"bold"} textAlign="left">
                Choose Categories
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box bg={useColorModeValue("white", "gray.700")} my={2}>
              <CheckboxGroup colorScheme="orange">
                <SimpleGrid columns={[3, 4, 6]} spacing={4}>
                  {tags &&
                    tags.map((tag) => (
                      <Checkbox
                        key={tag._id}
                        name="tag"
                        onChange={handleChange}
                        value={tag._id}
                      >
                        {tag.tagText}
                      </Checkbox>
                    ))}
                </SimpleGrid>
              </CheckboxGroup>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" fontWeight={"bold"} textAlign="left">
                List Ingredients
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel px={1} pb={4}>
            <AddIngredientForm onData={handleChildData} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" fontWeight={"bold"} textAlign="left">
                Step Instructions
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel px={1} pb={4}>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={detail}
              onChange={setDetail}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Button
        mx={"auto"}
        my={4}
        display={"block"}
        type="submit"
        onClick={handleFormSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default CreatePage;
