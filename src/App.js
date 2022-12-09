import React, {useEffect, useState} from 'react';
import './App.css';
import { Login } from './components/login/Login'
import { Header } from './components/header/Header';
import { Recipe } from './components/recipe/Recipe'
import { getPosts, getUserSavedPosts, getUserPosts, addUserToFollowing, addUserToFollowers, removeUserFollow, removeUserFromFollowers, getUser, getUserFollowingPosts } from "./firebase"
import { Modal, ButtonGroup, Avatar, Box, Grid, Paper} from '@mui/material';
import { Button } from '@mui/material';
import { CreatePost } from './components/post/create-post/CreatePost';
import { Cookbook } from './components/cookbook/Cookbook'
import { Post } from './components/post/Post'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SlUserFollowing } from "react-icons/sl";
import { AiOutlineHome, AiOutlineBook } from "react-icons/ai";
import { RiBookOpenLine, RiBookmarkLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const boxStyle = {
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 10,
};

const profileModalStyle = {
  justifyContent: 'center',
  height: '90%',
  overflow:'scroll',
  height: '110vh'
}

const headerStyle = {
  p: 2, 
  padding: '20px'
}

const paperStyle = {
  textAlign: 'center',
  justifyContent: 'center',
  height: '50',
  lineHeight: '49px',
}

const headerProfileStyle = {
  p: 2, 
  padding: '50px'
}

const accordStyle = {
  height: "200px"
}

function App() {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState({})
  const [picture, setPicture] = useState('');
  const [newUser, setNewUser] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  // Set view for profile
  const [viewProfile, setViewProfile] = useState(false);
  //Used to change whats being displayed in content section
  const [displayFlags, setDisplayFlags] = useState({
    homeFlag: true,
    savedFlag: false,
    savedRecipeFlag: false,
    cookbookFlag: false,
    followingFlag: false
  })
  // For Profile viewing
  const [postUser, setPostUser] = useState({
    followers: [],
    following: []
  })
  const [postUserPosts, setPostUserPosts] = useState([])

  const handleSetPostUser = (user) => {
    setPostUser(user)
  }

  const handleSetPostUserPosts = (posts) => {
    setPostUserPosts(posts)
  }

  const handleSetProfileView = () => {
    setViewProfile(true)
  }

  //runs upon page being reloaded
  useEffect(() => {
    // set the posts from db to posts state
    const fetchPosts = async () => {
      const posts = await getPosts()
      setPosts(posts) 
    }
    fetchPosts().catch(console.error)
  }, [])

  const removePostFromState = (unique) => {
    const newPosts = []
    for(const post of posts){
      if(post.post.unique != unique){
        newPosts.push(post)
      }
    }
    newPosts.reverse()
    setPosts(newPosts)
  }

  const handleGetSavedPosts = () => {
    const fetchSavedPosts = async () => {
      console.log("should hit")
      const userSavedPosts = await getUserSavedPosts(user.email)
      setSavedPosts(userSavedPosts)
    }
    fetchSavedPosts().catch(console.error)
  }

  const handleGetFollowingPosts = () => {
    const fetchPosts = async() => {
      const followingPosts = await getUserFollowingPosts(user.email)
      setFollowingPosts(followingPosts)
    }
    fetchPosts().catch(console.error)
  }

  const handleLogin = (user) => {
    setUser(user)
    setUsername(user.username)
    setPicture(user.picture)
    setDialogOpen(false)
  }

  const handlePublish = () => {
    setCreatePost(false)
    const fetchPosts = async () => {
      const posts = await getPosts()
      setPosts(posts) 
    }
    fetchPosts().catch(console.error)
  }

  const signOut = (event) => {
    setUsername(null)
    setSavedPosts([])
    setSavedRecipes([])
    setFollowingPosts([])
    setUser({})
    setPicture('')
    setDisplayFlags({
      homeFlag: true,
      savedFlag: false,
      savedRecipeFlag: false,
      cookbookFlag: false,
      followingFlag: false
    })
  }

  const signIn = (event) => {
    setNewUser(false)
    setDialogOpen(true)
  }

  const signUp = (event) => {
    setNewUser(true)
    setDialogOpen(true)
  }

  const creating = (event) => {
    setCreatePost(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setCreatePost(false)
  }

  const handleHomeFlag = () => {
    setDisplayFlags({
      homeFlag: true,
      savedFlag: false,
      savedRecipeFlag: false,
      cookbookFlag: false,
      followingFlag: false
    })
  }
  
  const handleFollowingFlag = () => {
    handleGetFollowingPosts()
    setDisplayFlags({
      homeFlag: false,
      savedFlag: false,
      savedRecipeFlag: false,
      cookbookFlag: false,
      followingFlag: true
    })
  }

  const handleCookbookFlag = () => {
    setDisplayFlags({
      homeFlag: false,
      savedFlag: false,
      savedRecipeFlag: false,
      cookbookFlag: true,
      followingFlag: false
    })
  }

  const handleSavedFlag = () => {
    handleGetSavedPosts()
    setDisplayFlags({
      homeFlag: false,
      savedFlag: true,
      savedRecipeFlag: false,
      cookbookFlag: false,
      followingFlag: false
    })
  }

  const updateSavedRecipes = () => {
    const fetchUserUpdate = async() => {
      const updatedUser = await getUser(user.email);
      setUser(updatedUser);
      setSavedRecipes(updatedUser.savedRecipes)
    }
    fetchUserUpdate().catch(console.error);
  }

  const handleSavedRecipeFlag = () => {
    // update user
    updateSavedRecipes()
    setDisplayFlags({
      homeFlag: false,
      savedFlag: false,
      savedRecipeFlag: true,
      cookbookFlag: false,
      followingFlag: false
    })
  }

  const currUserFollows = () => {
    const currUserFollowing = user.following;
    if(currUserFollowing && currUserFollowing.includes(postUser.email)){
        return true;
    } else {
        return false;
    }
  }

  const addFollow = (currUserEmail, postUserEmail) => {
    console.log("asdnnn")
    const followAdd = async (currUserEmail, postUserEmail) => {
      await addUserToFollowing(currUserEmail, postUserEmail)
      await addUserToFollowers(currUserEmail,postUserEmail)
      const currUser = await getUser(currUserEmail)
      const postUser = await getUser(postUserEmail)
      setPostUser(postUser)
      setUser(currUser)
      handleGetFollowingPosts()
    }
    if(currUserEmail){
      followAdd(currUserEmail, postUserEmail).catch(console.error)
    } else {
      alert("Must sign in to follow user")
    }
  }

  const removeFollow = (currUserEmail, postUserEmail) => {
    const followRemove = async (currUserEmail, postUserEmail) => {
        await removeUserFollow(currUserEmail, postUserEmail)
        await removeUserFromFollowers(currUserEmail, postUserEmail)
        const currUser = await getUser(user.email)
        const postUser = await getUser(postUserEmail)
        setPostUser(postUser)
        setUser(currUser)
        handleGetFollowingPosts()
    }
    followRemove(currUserEmail, postUserEmail).catch(console.error)
  }

  const removeFollowInOwnProfile = (currUserEmail, postUserEmail) => {
    const followRemove = async (currUserEmail, postUserEmail) => {
      await removeUserFollow(currUserEmail, postUserEmail)
      await removeUserFromFollowers(currUserEmail, postUserEmail)
      const currUser = await getUser(user.email)
      setPostUser(currUser)
      setUser(currUser)
      handleGetFollowingPosts()
    }
    followRemove(currUserEmail, postUserEmail).catch(console.error)
  }

  const handleViewOwnProfile = () => {
    const fetch = async() => {
      const currUser = await getUser(user.email)
      const currUserPosts = await getUserPosts(user.username)
      setUser(currUser)
      setPostUser(currUser)
      setPostUserPosts(currUserPosts)
      setViewProfile(true)
    }
    fetch().catch(console.error)
  }

  return (
    <div className="app">
      <Modal sx={profileModalStyle} open={viewProfile} onClose = {() => setViewProfile(false)}>
                <Box sx={boxStyle}>
                <div>
                    <div>
                        {user !== {} && user.username === postUser.username ? (
                        <Box>
                            <Typography size={9}><strong><em>Your Profile</em></strong></Typography>
                        </Box>
                        ) : (
                            <>
                                {user !== {} && currUserFollows() ? (
                                    <Box>
                                        <Button variant="outlined" onClick={() => removeFollow(user.email, postUser.email)}>
                                            Un-Follow
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button variant="outlined" onClick={() => addFollow(user.email, postUser.email)}>
                                            Follow
                                        </Button>
                                    </Box>
                                )}
                            </>
                        )}
                        <Box sx={headerProfileStyle}>
                            <Grid container spacing={2}>
                                <Grid>
                                    <Avatar
                                    sx={{ width: 70, height: 70 }}
                                    className="post-profile-pic"
                                    src={postUser.picture}
                                    
                                    />
                                </Grid>
                                <Grid xs={2}>
                                    <Typography><h1>{postUser.username}</h1></Typography>
                                </Grid>
                            </Grid>
                                <br></br>
                                <br></br>
                                <h3>{postUser.description}</h3>
                        </Box>
                        
                        <Box>
                            <Grid container spacing={1}>
                                <Grid xs={3}>
                                    <Paper sx={paperStyle}>
                                        <strong>Posts</strong>: {postUser.numPosts} 
                                    </Paper>
                                    
                                </Grid>
                                <Grid xs={4.5}>
                                    <Paper sx={paperStyle}>
                                        <Accordion>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography><strong>Followers</strong>: {postUser.followers.length}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {
                                                    postUser.followers.map( follow => (<h4>{follow}</h4>))
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                    </Paper>
                                </Grid>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Grid xs={4.5}>
                                    <Paper sx={paperStyle}>
                                        <Accordion>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography><strong>Following</strong>: {postUser.following.length}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails sx={accordStyle}>
                                                {
                                                    postUser.following.map( follow => (
                                                        <>
                                                        {user !== {} && user.username === postUser.username ? (
                                                            <Grid container spacing={1}>
                                                                <h4>{follow}</h4>
                                                                <Button size = 'small' onClick={() => removeFollowInOwnProfile(user.email, follow)}>UnFollow</Button>
                                                            </Grid>
                                                        ) : (
                                                            <h4>{follow}</h4>
                                                        )}
                                                        </>
                                                    ))
                                                }
                                            </AccordionDetails>
                                        </Accordion> 
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                        <br></br>
                    </div>
                    <div className='posts-gallery-section'>
                        <div className='posts'>
                            <Grid container spacing={1}>
                                {
                                    postUserPosts.map(({ id, post}) => (
                                        <Grid xs={5}>   
                                            <Post key={id} recipeId={post.recipeId} instructions={post.instructions} updateAllPostsCallback={removePostFromState} updateSavedPostsCallback={handleGetSavedPosts} handleSetProfileView={handleSetProfileView} postUserCallBack={handleSetPostUser} postUserPostsCallBack={handleSetPostUserPosts} savedSectionFlag={false} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} email={post.email} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {user}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                    </div>    
                </div>
            </Box>
        </Modal>
      <Modal open={dialogOpen} onClose = {() => setDialogOpen(false)}>
        <Login handleLogin={handleLogin} handleClose = {handleClose} newUser = {newUser}/>
      </Modal>
      <Modal open={createPost} onClose = {() => setDialogOpen(false)}>
        <CreatePost handlePublish = {handlePublish} handleClose = {handleClose} currUser = {user} picture = {picture}/>
      </Modal>
      {/* Header Section */}
      <Header/>
      {username ? (
        <div className='user-info'>
          <div>
            <Box sx={headerStyle}>
                <Grid container spacing={2}>
                    <Grid>
                        <Avatar
                        sx={{ width: 60, height: 60 }}
                        className="post-profile-pic"
                        src={user.picture}
                        
                        />
                    </Grid>
                    <Grid xs={2}>
                      <Button onClick={handleViewOwnProfile}><Typography><h2>{username}</h2></Typography></Button>
                    </Grid>
                </Grid>
            </Box>
            <ButtonGroup>
              <Button onClick={creating}>Create Post</Button>
              <Button color="error" onClick={signOut}>Sign Out</Button>
            </ButtonGroup>
            
          </div>
        </div>
      ):(
        <div className='user-info'>
          <ButtonGroup>
            <Button onClick={signIn}>Sign In</Button>
            <Button onClick={signUp}>Sign Up</Button>
          </ButtonGroup>
        </div>
      )}
      <br></br>
      <Box>
      {/* Sidebar Section */}
      <Box sx={{ display: 'flex' }}>
            <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                width: 220,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="right"
            >
            <Toolbar />
                <Divider />
                {user.username ? (
                  <List>
                  <ListItem key={"Home"} disablePadding>
                      <ListItemButton
                        onClick={handleHomeFlag}>
                      <ListItemIcon>
                      <IconContext.Provider
                        value={{ size: '30px' }}
                      >
                        <div>
                            <AiOutlineHome color={displayFlags.homeFlag ? 'blue' : '' } size={39}></AiOutlineHome>
                        </div>
                      </IconContext.Provider>
                      </ListItemIcon>
                      <ListItemText primary={"Home"} />
                      </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem key={"Following"} disablePadding>
                      <ListItemButton
                        onClick={handleFollowingFlag}
                      >
                        <ListItemIcon>
                          <SlUserFollowing color={displayFlags.followingFlag ? 'blue' : '' } size={35}></SlUserFollowing>
                        </ListItemIcon>
                      <ListItemText primary={"Following"} />
                      </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem key={"Cookbook"} disablePadding>
                      <ListItemButton
                        onClick={handleCookbookFlag}
                      >
                      <ListItemIcon>
                        <RiBookOpenLine color={displayFlags.cookbookFlag ? 'blue' : '' } size={36}></RiBookOpenLine>
                      </ListItemIcon>
                      <ListItemText primary={"Cookbook"} />
                      </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem key={"Saved Posts"} disablePadding>
                      <ListItemButton
                        onClick={handleSavedFlag}
                      >
                        <ListItemIcon>
                          <RiBookmarkLine color={displayFlags.savedFlag ? 'blue' : '' } size={36}></RiBookmarkLine>
                        </ListItemIcon>
                      <ListItemText primary={"Saved Posts"} />
                      </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem key={"Saved Recipes"} disablePadding>
                      <ListItemButton
                        onClick={handleSavedRecipeFlag}
                      >
                        <ListItemIcon>
                          <AiOutlineBook color={displayFlags.savedRecipeFlag ? 'blue' : '' } size={37}></AiOutlineBook>
                        </ListItemIcon>
                      <ListItemText primary={"Saved Recipes"} />
                      </ListItemButton>
                  </ListItem>
              </List>
                  ) :(
                    <div></div>
                  )}
                <Divider />
            </Drawer>
        </Box>
        <Box>
        {/* Content Display Section */}
          <div className='posts-section'>
            {displayFlags.homeFlag ? (
              <div className='posts'>
                {
                    posts.map(({ id, post}) => (
                        <Post key={id} instructions={post.instructions} recipeId={post.recipeId} updateAllPostsCallback={removePostFromState} handleSetProfileView={handleSetProfileView} updateSavedPostsCallback={handleGetSavedPosts} postUserCallBack={handleSetPostUser} postUserPostsCallBack={handleSetPostUserPosts} savedSectionFlag={false} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} email={post.email} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {user}/>
                    ))
                }
              </div>
            ) : (
              <></>
            )}
            {displayFlags.savedFlag ? (
              <div className='posts'>
                {
                  savedPosts.map(({ id, post}) => (
                      <Post key={id} instructions={post.instructions} recipeId={post.recipeId} updateAllPostsCallback={removePostFromState} handleSetProfileView={handleSetProfileView} updateSavedPostsCallback={handleGetSavedPosts} postUserCallBack={handleSetPostUser} postUserPostsCallBack={handleSetPostUserPosts} savedSectionFlag={true} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} email={post.email} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {user}/>
                  ))
                }
              </div>
            ) : (
              <></>
            )}
            {displayFlags.followingFlag ? (
              <div className='posts'>
                {
                  followingPosts.map(({ id, post}) => (
                      <Post key={id} instructions={post.instructions} recipeId={post.recipeId} updateAllPostsCallback={removePostFromState} handleSetProfileView={handleSetProfileView} updateSavedPostsCallback={handleGetSavedPosts} postUserCallBack={handleSetPostUser} postUserPostsCallBack={handleSetPostUserPosts} savedSectionFlag={false} unique={post.unique} postId = {id} rating = {post.rating} picture = {post.picture} username ={post.username} email={post.email} caption={post.caption} image = {post.image} recipe = {post.recipe} comments = {post.comments} currUser = {user}/>
                  ))
                }
              </div>
            ) : (
              <></>
            )}
            {displayFlags.cookbookFlag ? (
              <Cookbook currUser={user}></Cookbook>
            ) : (
              <></>
            )}
            {displayFlags.savedRecipeFlag ? (
              <div className='posts'>
              {
                savedRecipes.map(({title, ingredients, instructions}) => (
                  <>
                  <Recipe title={title} ingredients={ingredients} instructions={instructions} currUser={user} cookbookPageFlag={false} updateUserCallback={updateSavedRecipes}></Recipe>
                  <br></br>
                  <br></br>
                  <br></br>
                  </>
                ))
              }
              </div>
            ) : (
              <></>
            )}
            </div>
          <br></br>
        </Box>
      </Box>
    </div>
    
  );
}

export default App;
