export default (html: string): string => html.replace(/(<([^>]+)>)/gi, '')
