export type getNonceRes = {
  data: {
     data: {
        id: number,
        nonce: string
    },
    success: boolean
  }
}

export type loginRes = {
  data: {
     data: {
        accessToken: string
        profile: {
            favorites: { mint: string }[],
            profileNft: { mint: string, pic: string }
            username: string,
        }
    },
    success: true
  }
}

export type refreshRes = {
  data: {
    data: {
      accessToken: '' // TODO
    }
  }
}

export type userRes = {
  data: {
    data: {
      profile: {
          favorites: { mint: string }[],
          profileNft: { mint: string, pic: string }
          username: string,
      }
    }
  }
}

export type addFavoriteRes = {

}

export type setProfilePicRes = {
  
}