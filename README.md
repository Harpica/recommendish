# recommendish
Frontend and backend for site "Recommendish" which allows to share recommendations on products React/Express/Mongo/Docker
## Deploy
https://recommendish.harpica.dev/
## Description
- This is monorepository with frontend and backend
- It represents one-page site which is adapted for commonly used devices
- Site supports local registration and authorization using socials: github and vkontakte
- You can write your own recommendation on any movie, game or book using Markdown editor, share it with others, add comments, rate different products, like other users' recommendations and also export any recommendation as pdf
- Supports native MongoDB full-text search
- All downloaded images are stored in the cloud
- Has administration panel (maintain user statuses, recommendations)
## Instruments & Technologies
#### Frontend
- Typescript
- React (CRA, Router, React Hook Form)
- MobX
- Tailwind
- Mui
#### Backend
- Typescript
- Express
- Mongoose
- Passport
- Cloudinary
- Cors
- Bcrypt
#### Deploy
- Github actions
- Docker, Docker compose
## Futher development
- Optimize rerenders of Nav component
- Add posibility to paste downloaded images to the body of the recommendation itself
- Refresh dockerfile for local
- Add minification for uploaded images
- Add functionality to change name and/or avatar
