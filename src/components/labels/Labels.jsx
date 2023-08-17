import { Tooltip, styled } from '@mui/material'
import { ExitIcon } from '../../assets/icons'
import { labels } from '../../utils/constants/labels'

export const Labels = () => {
   return (
      <div>
         <HeadingLabel>Labels</HeadingLabel>
         <AllContainer>
            {labels.map((item) => (
               <ContainerLabels
                  style={{ backgroundColor: item.backgroundColor }}
                  key={item.id}
               >
                  <TextLabels title={item.title} arrow>
                     {item.title}
                  </TextLabels>
                  <ExitIcon />
               </ContainerLabels>
            ))}
         </AllContainer>
      </div>
   )
}

const HeadingLabel = styled('p')(({ theme }) => ({
   color: theme.palette.secondary.gray,
   fontFamily: 'CarePro',
   fontSize: '0.875rem',
   fontStyle: 'normal',
   fontWeight: '400',
   lineHeight: 'normal',
   marginBottom: '0.5rem',
}))

const AllContainer = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '0.62rem',
}))

const ContainerLabels = styled('div')(() => ({
   padding: ' 0.25rem 0.375rem 0.25rem 0.625rem',
   borderRadius: '0.375rem',
   display: 'flex',
   alignItems: 'center',
   gap: '0.34rem',
   color: '#FFF',
}))

const TextLabels = styled(Tooltip)(() => ({
   color: '#FFF',
   fontFamily: 'CarePro',
   fontSize: '1rem',
   fontStyle: 'normal',
   fontWeight: '500',
   lineHeight: ' normal',
   maxWidth: '11.25rem',
   maxHeight: '1rem',
   cursor: 'pointer',
}))
