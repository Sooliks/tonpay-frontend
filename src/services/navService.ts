export const getNameByPath = (path: string) => {
  switch (path) {
      case 'pc_games': return 'PC Games'
      case 'mobile_games': return 'Mobile Games'
      case 'tg_mini_app_game': return 'Telegram Mini Apps'
      case 'social_network': return 'Social networks'
      case 'real_live': return 'Real live'
      default: return undefined
  }
}