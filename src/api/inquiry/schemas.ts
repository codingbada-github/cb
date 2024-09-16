export interface PostInquiryRequest {
  phone_number: string
  content: string
}

export interface PostInquiryResponse {
  public_id: string
  phone_number: string
  content: string
}
