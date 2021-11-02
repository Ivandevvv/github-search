
export interface IGithubResponse {
  incomplete_results: boolean;
  items: IGithubResponseItem[];
  total_count: number;
}

export interface IGithubResponseItem {
  full_name: string;
  homepage: string;
  pushed_at: string;
  visibility: VisibilityEnum;
}

export interface IRepositoryItem extends IGithubResponseItem {
  default_branch: string;
  html_url: string;
  forks_count: number;
}

export enum VisibilityEnum {
  public = 'public',
  private = 'private'
}
