export interface VaultItem {
  _id?: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
