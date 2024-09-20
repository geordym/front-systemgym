export interface User {
  uid:           string;
  displayName:   string;
  email:         string;
  photoURL:      string;
  emailVerified: boolean;
  metadata:      Metadata;
  providerData:  ProviderDatum[];
  refreshToken:  string;
  tenantId:      null;
  anonymous:     boolean;
  role: string;
}

export interface Metadata {
  creationTime:   Date;
  lastSignInTime: Date;
}

export interface ProviderDatum {
  providerId:  string;
  uid:         string;
  displayName: string;
  email:       string;
  photoURL:    string;
}
