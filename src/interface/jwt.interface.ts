export interface JwtInfoInterface{
    /**
     * User ID associated with the JWT.
     */
    user_id: string,

    /**
     * Juanmiloz associated with the JWT.
     */
    username: string,

    /**
     * Issued At timestamp indicating when the JWT was issued.
     */
    iat: number,

    /**
     * Expiration timestamp indicating when the JWT expires.
     */
    exp: number;
}