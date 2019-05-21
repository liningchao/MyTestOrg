public class SalesforceToken {
        public String id;
        public String issued_at;
        public String token_type;
        public String instance_url;
        public String signature;
        public String access_token;
        public SalesforceToken(String t_id, 
                                String t_issued_at, 
                                String t_token_type, 
                                String t_instance_url, 
                                String t_signature, 
                                String t_access_token) {
            id = t_id;
            issued_at = t_issued_at;
            token_type = t_token_type;
            instance_url = t_instance_url; 
            signature = t_signature;
            access_token = t_access_token;
        }
    }