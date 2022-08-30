use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApplicationError {
    #[error(transparent)]
    CpuError(#[from] std::io::Error),
}

impl serde::Serialize for ApplicationError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
