class AllTheUsers:
    
    def __init__ (self):

        self._next_id = 1
        self.users = []

    def generate_id(self):

        generated_id = self._next_id
        self._next_id =+ 1
        return generated_id
    
    def add_user(self, member):
        
        member.id = self.generate_id()
        self.users.append(member)
        return (member)