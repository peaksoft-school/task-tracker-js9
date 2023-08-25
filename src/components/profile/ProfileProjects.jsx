import styled from '@emotion/styled'
import React from 'react'
import { useSelector } from 'react-redux'

export const ProfileProjects = () => {
   const { item } = useSelector((state) => state.profile)

   return (
      <ProjectsContainer>
         <ProjectsHeader>
            <p>involved in projects</p>
            <ProjectCount>{item?.countWorkSpaces}</ProjectCount>
         </ProjectsHeader>
         <ProjectsList>
            {item?.workSpaceResponse?.map((project) => (
               <ProjectCard key={Math.random().toString()}>
                  <div>
                     <ProjectCardFirstLetter>
                        {project.workSpaceName &&
                           project.workSpaceName.charAt(0)}
                     </ProjectCardFirstLetter>
                  </div>
                  <div>
                     <ProjectCardTitle>
                        {project.workSpaceName}
                     </ProjectCardTitle>
                     <ProjectCartText>{project.text}</ProjectCartText>
                  </div>
               </ProjectCard>
            ))}
         </ProjectsList>
      </ProjectsContainer>
   )
}

const ProjectsContainer = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   marginLeft: '3.75rem',
   flexWrap: 'wrap',
})

const ProjectsHeader = styled('div')({
   display: 'flex',
   marginBottom: '1rem',
})

const ProjectCount = styled('span')({
   marginLeft: '0.5rem',
   fontWeight: 'bold',
   fontSize: '0.8rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'grey',
   borderRadius: '50%',
   width: '1.3rem',
   height: '1.3rem',
   color: 'white',
})

const ProjectsList = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '1rem',
   flexWrap: 'wrap',
   height: '20rem',
})

const ProjectCard = styled('div')({
   display: 'flex',
   alignItems: 'center',
   width: '9.125rem',
   height: '4.125rem',
   borderRadius: '0.5rem',
   gap: '0.7rem',
   cursor: 'pointer',
})

const ProjectCardFirstLetter = styled('div')({
   width: '4.25rem',
   height: '4.125rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: ' #0079BF',
   padding: '0.3125rem 0.8125rem 0.3125rem 0.8125rem',
   borderRadius: '0.625rem',
   gap: '0.5rem',
   color: 'white',
   fontFamily: 'Gilroy',
   fontWeight: '600',
   fontSize: '2rem',
})

const ProjectCardTitle = styled('h2')({
   fontFamily: 'CarePro',
   fontWeight: '500',
   color: '#000000',
})

const ProjectCartText = styled('p')({
   fontFamily: 'CarePro',
   fontWeight: '400',
   color: '#919191',
})
