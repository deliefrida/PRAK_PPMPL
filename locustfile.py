from locust import HttpUser, TaskSet, task, between

# Latihan Dasar
class BasicUserBehavior(TaskSet):
    @task
    def get_users(self):
        self.client.get("/users")  # Permintaan GET ke endpoint /users untuk latihan dasar

# Pengujian Utama
class UserBehavior(TaskSet):
    @task(3)  # Prioritas paling tinggi
    def get_posts(self):
        self.client.get("/posts")

    @task(2)  # Prioritas menengah
    def get_users(self):
        self.client.get("/users")

    @task(1)  # Prioritas lebih rendah
    def get_user_details(self):
        user_id = 1  # Ubah ID pengguna sesuai kebutuhan
        self.client.get(f"/users/{user_id}")

# Kelas untuk Virtual User dengan Latihan Dasar
class BasicWebsiteUser(HttpUser):
    tasks = [BasicUserBehavior]
    wait_time = between(1, 5)  # Waktu tunggu antara 1 hingga 5 detik sebelum permintaan berikutnya

# Kelas untuk Virtual User dengan Pengujian Utama
class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = lambda self: self.random.uniform(5, 9)  # Waktu tunggu antara permintaan dalam detik (5-9 detik)
